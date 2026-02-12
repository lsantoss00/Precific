import Row from "@/src/components/core/row";

interface StatusBadgeProps {
  status: "ACTIVE" | "INACTIVE";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusStyles = {
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-red-500",
  };

  return (
    <Row
      className={`rounded-full px-2 py-0.5 h-fit w-fit items-center shrink-0 ${statusStyles[status]}`}
    >
      <span className="text-white text-xs font-medium uppercase">
        {status === "ACTIVE" ? "Ativo" : "Inativo"}
      </span>
    </Row>
  );
};

export default StatusBadge;
