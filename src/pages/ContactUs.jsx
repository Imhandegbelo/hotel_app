import ContactForm from "../components/ContactForm";

export default function ContactUs() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[320px] md:h-[376px] lg:h-[650px] bg-black/50">
        <h1 className="text-4xl">Contact us</h1>
        <p className="w-4/5 md:w-3/5 text-white/90 text-center">
          We’re here to help! Reach out to us with any questions, feedback, or
          assistance you need.
        </p>
      </div>
      <div className="py-16 px-6 md:px-12 lg:px-16 space-y-5">
        <div className="flex justify-between">
          <h2 className="uppercase font-Grotesk">Contact info</h2>
          <p>
            <span className="text-primary">*</span> Required
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
