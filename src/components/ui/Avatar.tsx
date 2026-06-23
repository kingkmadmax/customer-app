export default function Avatar({ name }: { name: string }) {
  const initial = name[0].toUpperCase(); // just first letter

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#4A90E2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {initial}
    </div>
  );
}
