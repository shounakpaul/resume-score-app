import React from "react";
import Lottie from "lottie-react";
import DashboardAnimation from "../assets/DashboardAnimation.json";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-5 py-20 dark:bg-dark dark:text-light">
      <Lottie
        animationData={DashboardAnimation}
        loop={true}
        className="h-64 w-64"
      />
      <h1 className="text-4xl font-extrabold">
        Unlock Your Dream Job with a Winning Resume!
      </h1>
      <h5 className="text-2xl font-light">
        Analyze, Optimize, and Ace Your Resume—Score It Against Your Next Big
        Opportunity!
      </h5>

      <SignedOut>
        <SignInButton
          className="border-2 rounded-3xl px-4 py-2 dark:border-light/20"
          mode="modal"
        />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-row gap-x-5 pt-10">
          <Link to="/checker">
            <Button color="peach">Check your Resume</Button>
          </Link>
          <Link to="/compare">
            <Button color="peach">Compare Resumes</Button>
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}

export default Dashboard;
