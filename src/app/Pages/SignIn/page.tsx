import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="container">
      <div className="left">
        <h1>Create an account</h1>
        <p className="subtitle">Enter your details below</p>

        <form className="form">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email or Phone Number" />

          <div className="fida">
            <span>Fida ID</span>
            <div className="id-box">
              <span role="img" aria-label="id">
                🪪
              </span>
            </div>
          </div>

          <button className="create">Create Account</button>

          <button className="google">
            <img src="/google.svg" alt="google" width={18} />
            Sign up with Google
          </button>

          <p className="login">
            Already have account? <a href="#">Log in</a>
          </p>
        </form>
      </div>

      <div className="right">
        <Image
          src="/shopping-phone.png"
          alt="shopping"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}