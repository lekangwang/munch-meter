import ProgressCircle from "react-native-progress-circle-updated";
import { palette } from "./Palette";
import { P, H1, H2, H3, H4, H5 } from "./Typography";

export default function Dial({ radius, value, maxValue, label }) {
  return (
    <ProgressCircle
      percent={Math.ceil((value / maxValue) * 100)}
      radius={radius}
      borderWidth={8}
      color={palette.accent}
      bgColor={palette.lightText}
    >
      <H3>{value}</H3>
      <H5 style={{ textAlignVertical: "center", textAlign: "center" }}>
        {label}
      </H5>
    </ProgressCircle>
  );
}
