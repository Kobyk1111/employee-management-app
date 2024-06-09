import { Schema, model } from "mongoose";
import validator from "validator";

const leaveSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    // required: true,
  },
  leaveType: {
    type: String,
    enum: [
      "Sick Leave",
      "Casual Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Annual Leave",
      "Unpaid Leave",
      "Paid Leave",
      "Educational Leave",
      "Child Sick Leave",
    ],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  adminRemarks: {
    type: String,
  },
});

const Leave = model("Leave", leaveSchema);

export default Leave;
