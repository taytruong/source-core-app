export interface OrderActionProps {
  onClick: () => void;
  children: React.ReactNode;
}

function OrderAction({ children, onClick }: OrderActionProps) {
  return (
    <button
      className="flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 p-2 hover:bg-slate-100"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OrderAction;
