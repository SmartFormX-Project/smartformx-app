import "./styles.css";

function LoaderComponent() {
 
  return (
    <div className="wrapper">
      <span>Analisando...</span>
      <p>Isso pode levar um tempo</p>
      <div className="loader"></div>
    </div>
  );
}

export default LoaderComponent;
