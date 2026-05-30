import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Search } from "lucide-react";
import {
  buildAreaFallback,
  fetchAddressesForPostcode,
  type AddressSuggestion,
  type PostcodeLookupResult,
} from "@/lib/postcodes";
import { cn } from "@/lib/utils";

interface AddressPickerProps {
  postcodeDetails: PostcodeLookupResult;
  value: string;
  onChange: (address: string) => void;
  className?: string;
}

export function AddressPicker({
  postcodeDetails,
  value,
  onChange,
  className,
}: AddressPickerProps) {
  const [addresses, setAddresses] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let cancelled = false;

    async function loadAddresses() {
      setLoading(true);
      setFilter("");
      setManualMode(false);
      onChangeRef.current("");

      try {
        const results = await fetchAddressesForPostcode(postcodeDetails);
        if (cancelled) return;

        setAddresses(results);

        if (results.length === 1) {
          onChangeRef.current(results[0].formatted);
        }
      } catch {
        if (!cancelled) {
          const fallback = buildAreaFallback(postcodeDetails);
          setAddresses([fallback]);
          onChangeRef.current(fallback.formatted);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadAddresses();

    return () => {
      cancelled = true;
    };
  }, [postcodeDetails]);

  const filteredAddresses = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return addresses;
    return addresses.filter((address) =>
      address.formatted.toLowerCase().includes(query),
    );
  }, [addresses, filter]);

  if (loading) {
    return (
      <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Finding addresses for {postcodeDetails.postcode}...
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Select Your Address
        </Label>

        {!manualMode && addresses.length > 1 && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by house number or street"
              className="bg-background border-border h-11 pl-9 text-foreground"
            />
          </div>
        )}

        {!manualMode ? (
          <div className="max-h-56 overflow-auto rounded-xl border border-border bg-background">
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((address) => {
                const selected = value === address.formatted;
                return (
                  <button
                    key={address.formatted}
                    type="button"
                    onClick={() => onChange(address.formatted)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0",
                      selected
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/60 text-foreground",
                    )}
                  >
                    <MapPin
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        selected ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="text-sm leading-relaxed">{address.formatted}</span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                No addresses match your search.
              </div>
            )}
          </div>
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your full address"
            className="bg-background border-border h-12 text-foreground"
          />
        )}

        <button
          type="button"
          onClick={() => {
            setManualMode((prev) => !prev);
            if (!manualMode) onChange("");
          }}
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          {manualMode ? "Choose from address list" : "Enter address manually"}
        </button>
      </div>

      {value && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1">
            Selected address
          </p>
          <p className="text-sm text-foreground leading-relaxed">{value}</p>
        </div>
      )}
    </div>
  );
}
