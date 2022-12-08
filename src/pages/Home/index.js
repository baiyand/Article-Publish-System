import Bar from "@/components/Bar";
import "./index.scss";
const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: "500px", height: "400px" }}
        xData={["Vue", "Angular", "React"]}
        sData={[64, 55, 69]}
        title="Satisfaction of Three Frameworks"
      />

      <Bar
        style={{ width: "500px", height: "400px" }}
        xData={["Vue", "Angular", "React"]}
        sData={[19, 22, 40]}
        title="Utilization of Three Frames"
      />
    </div>
  );
};

export default Home;
