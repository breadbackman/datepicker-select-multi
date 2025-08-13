import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, compareAsc } from "date-fns";

export default function App() {
  const [selected, setSelected] = useState<Date[]>([]);

  const sortedYmd = useMemo(
    () =>
      [...selected]
        .sort((a, b) => compareAsc(a, b))
        .map((d) => format(d, "yyyy-MM-dd")),
    [selected]
  );

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>
        여러 날짜 선택 (하나의 캘린더)
      </h1>
      <DayPicker
        mode="multiple" // 하나의 캘린더에서 비연속 다중 선택
        selected={selected}
        onSelect={setSelected} // 배열로 관리
        // disabled={{ before: new Date() }}  // 예: 과거일 비활성화
      />

      <section style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>선택된 날짜</h2>
        {sortedYmd.length === 0 ? (
          <div style={{ color: "#6b7280" }}>아직 선택된 날짜가 없습니다.</div>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {sortedYmd.map((d) => (
              <span
                key={d}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "6px 10px",
                  borderRadius: 999,
                }}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
