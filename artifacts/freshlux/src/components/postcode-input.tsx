import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Check, AlertCircle, MapPin } from "lucide-react";
import {
  autocompletePostcodes,
  formatPostcodeLocation,
  lookupPostcode,
  normalizePostcodeInput,
  type PostcodeLookupResult,
} from "@/lib/postcodes";
import { cn } from "@/lib/utils";

type ValidationState = "idle" | "loading" | "valid" | "invalid";

interface PostcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidated?: (result: PostcodeLookupResult | null) => void;
  className?: string;
  inputClassName?: string;
}

export function PostcodeInput({
  value,
  onChange,
  onValidated,
  className,
  inputClassName,
}: PostcodeInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [validation, setValidation] = useState<ValidationState>("idle");
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skipLookupRef = useRef(false);

  const runLookup = useCallback(
    async (raw: string) => {
      const normalized = normalizePostcodeInput(raw);
      if (!normalized) {
        setValidation("idle");
        setLocationLabel(null);
        setErrorMessage(null);
        onValidated?.(null);
        return;
      }

      setValidation("loading");
      setErrorMessage(null);

      try {
        const result = await lookupPostcode(normalized);
        if (result) {
          onChange(result.postcode);
          setValidation("valid");
          setLocationLabel(formatPostcodeLocation(result));
          onValidated?.(result);
        } else {
          setValidation("invalid");
          setLocationLabel(null);
          setErrorMessage("Postcode not found. Check and try again.");
          onValidated?.(null);
        }
      } catch {
        setValidation("invalid");
        setLocationLabel(null);
        setErrorMessage("Unable to verify postcode. Please try again.");
        onValidated?.(null);
      }
    },
    [onChange, onValidated],
  );

  useEffect(() => {
    if (skipLookupRef.current) {
      skipLookupRef.current = false;
      return;
    }

    const normalized = normalizePostcodeInput(value);
    if (normalized.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const results = await autocompletePostcodes(normalized);
        setSuggestions(results.slice(0, 8));
        setShowSuggestions(results.length > 0);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (postcode: string) => {
    skipLookupRef.current = true;
    onChange(postcode);
    setSuggestions([]);
    setShowSuggestions(false);
    void runLookup(postcode);
  };

  const handleBlur = () => {
    window.setTimeout(() => {
      setShowSuggestions(false);
      if (value.trim()) {
        void runLookup(value);
      }
    }, 150);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            setValidation("idle");
            setLocationLabel(null);
            setErrorMessage(null);
            onValidated?.(null);
            onChange(normalizePostcodeInput(e.target.value));
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={handleBlur}
          placeholder="e.g. SW1A 1AA"
          autoComplete="postal-code"
          className={cn(
            "bg-background border-border text-base h-12 text-foreground pr-10 uppercase",
            validation === "valid" && "border-emerald-500/60",
            validation === "invalid" && "border-destructive/60",
            inputClassName,
          )}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {validation === "loading" && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {validation === "valid" && (
            <Check className="h-4 w-4 text-emerald-500" />
          )}
          {validation === "invalid" && (
            <AlertCircle className="h-4 w-4 text-destructive" />
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-border bg-card py-1 shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm font-medium uppercase text-foreground hover:bg-muted/60"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {validation === "valid" && locationLabel && (
        <p className="mt-2 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <MapPin className="h-4 w-4 shrink-0" />
          {locationLabel}
        </p>
      )}

      {validation === "invalid" && errorMessage && (
        <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}