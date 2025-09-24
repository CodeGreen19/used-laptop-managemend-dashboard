import MainLogo from "@/components/shared/main-logo";
import LoginButton from "../components/login-button";

export default function MarketingLoginPage() {
  return (
    <main>
      <div className="flex items-center justify-center mt-10">
        <MainLogo />
      </div>
      <div className="space-y-10">
        <h1 className="text-2xl mt-5 md:mt-10 sm:text-3xl md:text-4xl font-bold text-center">
          Laptop Revival & Electronics Hub
        </h1>
        <div className="flex justify-center w-full">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
