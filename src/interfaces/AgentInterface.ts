export interface AvailabilitySubInterface {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface AgentInterface {
  id: number;
  name: string;
  rating: number;
  state: string;
  availability: AvailabilitySubInterface;
}
