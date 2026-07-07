export interface SectionBoxItemProps {
  title: string;
  children: React.ReactNode;
}

function SectionBoxItem({ children, title }: SectionBoxItemProps) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default SectionBoxItem;
