import * as LottiePlayer from "@lottiefiles/lottie-player";

function Loading() {
  return (
    <div className="container">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://assets6.lottiefiles.com/packages/lf20_F7WfWB.json"
        style={{ width: "280px", margin: "auto" }}
      ></lottie-player>
    </div>
  );
}

export default Loading;
