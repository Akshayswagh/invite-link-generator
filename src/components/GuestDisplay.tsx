interface GuestDisplayProps {
  guestName: string;
}

const GuestDisplay = ({ guestName }: GuestDisplayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="wedding-card-elevated ornate-border max-w-lg w-full p-8 md:p-12 text-center space-y-6">
        <p className="text-muted-foreground text-sm tracking-widest uppercase">
          Wedding Invitation
        </p>
        <div className="space-y-2">
          <p className="text-muted-foreground">आपल्याला सप्रेम निमंत्रण</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-devanagari">
            {guestName}
          </h1>
        </div>
        <div className="w-16 h-px bg-accent mx-auto" />
        <p className="text-muted-foreground text-devanagari leading-relaxed">
          आपल्या शुभ उपस्थितीने समारंभ आनंददायी होईल.
          <br />
          कृपया आवर्जून उपस्थित रहा.
        </p>
        <div className="pt-4">
          <span className="text-devanagari text-accent font-semibold text-lg">
            🙏 शुभमंगल 🙏
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuestDisplay;
