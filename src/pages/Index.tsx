import { useSearchParams } from "react-router-dom";
import GuestDisplay from "@/components/GuestDisplay";
import InviteGenerator from "@/components/InviteGenerator";

const Index = () => {
  const [searchParams] = useSearchParams();
  const guest = searchParams.get("guest");

  if (guest) {
    return <GuestDisplay guestName={guest} />;
  }

  return <InviteGenerator />;
};

export default Index;
