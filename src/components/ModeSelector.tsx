export function ModeSelector({
  mode,
  setMode,
}: {
  mode: "topUp" | "redeem";
  setMode: (amount: "topUp" | "redeem") => void;
}) {
  function handleClick(value: "topUp" | "redeem") {
    setMode(value);
  }

  const Modes = ["topUp", "redeem"];

  return (
    <div className={"flex flex-1 relative space-x-4 h-12 w-40"}>
      <div className={"p-1 border border-background-accent rounded-xl flex-1"}>
        <div className={"relative flex rounded-xl flex-1 h-full"}>
          {Modes.map((a) => (
            <div
              key={a}
              onClick={() => handleClick(a as "topUp" | "redeem")}
              className={"w-1/2 z-50"}
            >
              <SelectorButton text={a} active={a === mode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectorButton({
  text,
  active,
}: {
  text: string | number;
  active: boolean;
}) {
  return (
    <div
      className={`w-full flex flex-1 justify-center items-center h-full cursor-pointer ${
        active ? "" : "hover:bg-background-accent-2"
      } transition rounded-custom`}
    >
      <span
        className={`text-xs font-medium ${
          active ? "text-action font-semibold" : "text-title"
        } transition`}
      >
        {text}
      </span>
    </div>
  );
}
