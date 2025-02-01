import { Connection } from "mongoose";
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    con: Connection | null;
    promise: Promise<Connection> | null;
  };
}
export {};
