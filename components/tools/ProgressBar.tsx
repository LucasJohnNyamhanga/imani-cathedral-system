import LinearProgress from "@material-ui/core/LinearProgress";
import Styles from "../../styles/progressBar.module.scss";

type dataType = {
  value: number;
};

export default function CustomizedProgressBars({ value }: dataType) {
  return (
    <div className={Styles.change}>
      <LinearProgress
        variant="determinate"
        value={value}
        style={{
          backgroundColor: "rgb(169,169,169)",
          height: "10px",
        }}
      />
    </div>
  );
}
