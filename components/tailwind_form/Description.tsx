export default function Description({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <p
      className={className ? className : "mt-1 text-sm leading-6 text-gray-600"}
    >
      {text}
    </p>
  );
}
