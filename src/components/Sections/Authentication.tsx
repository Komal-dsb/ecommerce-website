import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface FormData {
  email: string;
  password: string;
}

function Authentication() {
  const [isSignUp, setIsSignUP] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const toggleForm = () => {
    setIsSignUP(!isSignUp);
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) toast.error(`Google sign-in failed: ${error.message}`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (signUpError) {
          toast.error(`Sign up failed: ${signUpError.message}`);
          return;
        } else toast.success("Sign-up successful!");
      } else {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (signInError?.message === "Email not confirmed") {
          toast.error("Please confirm your email before logging in.");
        } else if (signInError?.message === "Invalid login credentials") {
          toast.error(`Invalid email or password`);
        } else if (signInError) {
          toast.error(`Login failed: ${signInError.message}`);
        } else if (!signInData.session) {
          toast.error("Login failed: Please confirm your email first.");
        } else {
          toast.success("Login successful!");
          navigate("/");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center  h-[100vh] bg-muted px-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold  ">
            {isSignUp ? "Sign Up" : "Sign In"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="py-2 text-lg ">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="py-2  text-lg">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full ">
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-4 text-sm">
            {isSignUp ? "Already have an account?" : "New here?"}{" "}
            <button
              onClick={toggleForm}
              className="text-blue-600 hover:underline font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-4 w-full">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              OR
            </span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Authentication;
