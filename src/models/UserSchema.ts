import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  image: {
    type: String,
    required: false,
    default: "https://placehold.net/avatar-2.svg",
  },
  role: {
    type: String,
    enum: ["user", "admin", "vendor", "distributor", "retailer", "farmer", "staff"],
    default: "user",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  location: {
    type: String,
    trim: true,
  },
  contact_no: {
    type: String,
  },
  alternate_contact_no: {
    type: String,
  },
  language: { type: String, default: "en" },
  timezone: { type: String, default: "UTC" },

  company: {
    name: { type: String, trim: true },
    type: {
      type: String,
      enum: ["Individual", "Startup", "SME", "Enterprise", "Government", "NGO", "Cooperative"],
      default: "Individual",
    },
    industry: { type: String, trim: true },
    registrationNumber: { type: String, trim: true },
    taxId: { type: String, trim: true },
    vatNumber: { type: String, trim: true },
    website: { type: String, trim: true },
    address: { type: String, trim: true },
    headquarters: { type: String, trim: true },
    operatingCountries: [{ type: String }],
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    certifications: [{ type: String }],
    sustainabilityPractices: [{ type: String }],
    importExportLicense: { type: String },
  },

  businessContact: {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    position: { type: String, trim: true },
  },

  preferences: {
    preferredFertilizerTypes: [{ type: String }],
    preferredCommunicationChannel: {
      type: String,
      enum: ["email", "sms", "phone", "whatsapp"],
      default: "email",
    },
    language: { type: String, default: "en" },
    receiveReports: { type: Boolean, default: true },
  },

  purchaseHistory: [
    {
      // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      purchaseDate: { type: Date },
      quantity: { type: Number },
      amount: { type: Number },
      currency: { type: String, default: "USD" },
      country: { type: String },
    },
  ],
  lastLogin: { type: Date },
  loginHistory: [
    {
      ip: { type: String },
      location: { type: String },
      device: { type: String },
      date: { type: Date },
    },
  ],


  achievements: [
    {
      title: { type: String, required: true },
      description: { type: String },
      year: { type: Number },
      iconColor: { type: String },
    }
  ],
  farms: [
    {
      name: { type: String, required: true },
      size: { type: String },
      location: { type: String },
      established: { type: Number },
      crops: { type: String },
      status: { type: String, enum: ["Active", "Planning", "Inactive"], default: "Active" }
    }
  ],


  authProviderId: {
    type: String,
  },
  isSubscribedToNewsletter: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpiry: {
    type: Date,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordTokenExpiry: {
    type: Date,
    select: false,
  },
  
},
  {
    timestamps: true,
  });

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
