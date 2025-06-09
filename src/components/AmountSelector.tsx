export function AmountSelector({
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: (amount: string) => void;
}) {
  function handleClick(value: number) {
    setAmount(value.toFixed(2));
  }

  const Amounts = [10, 25, 50];

  const markerPosition =
    Number(amount) === Amounts[0]
      ? "left-0"
      : Number(amount) === Amounts[1]
        ? "left-1/3"
        : Number(amount) === Amounts[2]
          ? "left-2/3"
          : "opacity-0";

  return (
    <div className={"flex flex-1 relative space-x-4 h-12"}>
      <div className={"p-1 border border-background-accent rounded-xl flex-1"}>
        <div className={"relative flex rounded-xl flex-1 h-full"}>
          {Amounts.map((a) => (
            <div
              key={a}
              onClick={() => handleClick(Number(a))}
              className={"w-1/3 z-50"}
            >
              <SelectorButton text={`$${a}`} active={a === Number(amount)} />
            </div>
          ))}
          <div
            className={`w-1/3 transition-all duration-500 rounded-xl absolute top-0 bottom-0 bg-cta z-20 ${markerPosition}`}
          />
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
