interface ITransportConnection {
  connections: {
    from: {
      departureTimestamp: number;
    };
    to: {
      arrivalTimestamp: number;
    };
  };
}

export default ITransportConnection;
