import mongoose, { Document, Model } from "mongoose";

/**
 * Interface representing a User document.
 */
interface UserDocument extends Document {
  username: string;
  _id: string;
  avatar_url: string;
  type: string;
  repos_url: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  friends?: string[];
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface representing the User model.
 */
interface UserModel extends Model<UserDocument> {}

/**
 * User Schema definition.
 */
const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  _id: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    // validate: (url) => validator.isURL(url),
  },
  type: {
    type: String,
  },
  repos_url: {
    type: String,
  },
  name: {
    type: String,
  },
  company: {
    type: String,
  },
  blog: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    // validate: (email) => validator.isEmail(email),
  },
  bio: {
    type: String,
  },
  public_repos: {
    type: Number,
  },
  public_gists: {
    type: Number,
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  friends: {
    type: [String],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});

/**
 * User model based on the userSchema.
 */
const UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { UserModel };
export { UserDocument };
