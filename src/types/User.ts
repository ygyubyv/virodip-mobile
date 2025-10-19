import type { Car } from "./Car";
import type { UserSubscription } from "./Subscription";
import type { Transaction } from "./Transaction";
import type { Booking } from "./Booking";

export type Role = "user" | "guardian" | "admin";

export type UserSummary = Pick<
  User,
  "id" | "name" | "email" | "phone" | "avatarUrl" | "createdAt"
>;

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  cars: Car[];
  roles: Role[];
  subscription: UserSubscription;
  transactions: Transaction[];
  createdAt: string;
  bookings: Booking[];
};
