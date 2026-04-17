type Props = {
  title: string;
  action?: React.ReactNode;
};

export default function SectionHeader({ title, action }: Props) {
  return (
    <div className="section-header">
      <span className="section-header-bar" />
      <span className="section-header-title">{title}</span>
      <span className="section-header-line" />
      {action}
    </div>
  );
}
