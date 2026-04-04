import { useState, useCallback } from "react";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import "@ai4bharat/indic-transliterate/dist/index.css";
import { BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Link, Share2 } from "lucide-react";

const PREFIXES = ["श्री.", "सौ.", "चि."] as const;

const InviteGenerator = () => {
  const [prefix, setPrefix] = useState<string>(PREFIXES[0]);
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const fullName = `${prefix} ${name}`.trim();

  const generateLink = useCallback(() => {
    if (!name.trim()) {
      toast.error("कृपया नाव प्रविष्ट करा / Please enter a name");
      return;
    }
    const url = `${BASE_URL}/?guest=${encodeURIComponent(fullName)}`;
    setGeneratedLink(url);
    toast.success("लिंक तयार झाली!");
  }, [fullName, name]);

  const copyLink = useCallback(async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success("लिंक कॉपी झाली!");
    } catch {
      toast.error("Copy failed");
    }
  }, [generatedLink]);

  const shareLink = useCallback(async () => {
    if (!generatedLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Invitation",
          text: `${fullName} यांना लग्नाचे निमंत्रण`,
          url: generatedLink,
        });
      } catch {
        // user cancelled
      }
    } else {
      toast.info("Share API not available — link copied instead");
      await navigator.clipboard.writeText(generatedLink);
    }
  }, [generatedLink, fullName]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="wedding-card-elevated ornate-border max-w-md w-full p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold text-devanagari">🕉 शुभविवाह 🕉</p>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Wedding Invite Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            लग्नपत्रिकेसाठी निमंत्रण लिंक तयार करा
          </p>
        </div>

        <div className="w-12 h-px bg-accent mx-auto" />

        {/* Prefix Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            उपाधी निवडा (Prefix)
          </label>
          <div className="flex gap-2">
            {PREFIXES.map((p) => (
              <button
                key={p}
                onClick={() => setPrefix(p)}
                className={`flex-1 py-2 px-3 rounded-md text-devanagari font-medium text-sm transition-all ${
                  prefix === p
                    ? "gradient-wedding-bg text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent/20"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Name Input with Transliteration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            नाव टाका (Enter Name)
          </label>
          <IndicTransliterate
            value={name}
            onChangeText={setName}
            lang="mr"
            renderComponent={(props: React.InputHTMLAttributes<HTMLInputElement>) => (
              <input
                {...props}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-devanagari ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Type name in English (e.g. Rahul Patil)"
              />
            )}
          />
        </div>

        {/* Preview */}
        {name && (
          <div className="rounded-lg bg-muted/50 border border-accent/20 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Preview</p>
            <p className="text-xl font-semibold text-primary text-devanagari">{fullName}</p>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateLink}
          className="w-full gradient-wedding-bg hover:opacity-90 text-primary-foreground font-medium h-11"
        >
          <Link className="w-4 h-4 mr-2" />
          Generate Link / लिंक तयार करा
        </Button>

        {/* Generated Link Display */}
        {generatedLink && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">Generated Link:</p>
              <p className="text-sm break-all text-foreground font-mono">{generatedLink}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={copyLink}
                variant="outline"
                className="flex-1 border-accent/40 hover:bg-accent/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={shareLink}
                variant="outline"
                className="flex-1 border-accent/40 hover:bg-accent/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteGenerator;
