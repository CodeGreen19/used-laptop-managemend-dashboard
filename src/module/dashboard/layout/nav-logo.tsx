import MainLogo from "@/components/shared/main-logo";

export default function NavLogo() {
  return (
    <div className="flex items-center gap-2">
      <MainLogo height={40} width={40} />
      <div>
        <h1 className="text-2xl leading-4 font-semibold group-data-[collapsible=icon]:hidden">
          Dashboard
        </h1>
      </div>
    </div>
  );
}
