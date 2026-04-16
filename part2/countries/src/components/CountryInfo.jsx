const CountryInfo = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>{props.capital}</div>
      <div>Area {props.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(props.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={props.flag} />
      <h2>Weather in {props.capital}</h2>
      <div>Temperature {props.temp} Celsius</div>
      <img
        src={` https://openweathermap.org/payload/api/media/file/${props.icon}.png`}
      />
      <div>Wind {props.speed} m/s</div>
    </div>
  );
};

export default CountryInfo;
