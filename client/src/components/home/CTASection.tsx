import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white">Ready to accelerate your career growth?</h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our AI-powered guidance
          </p>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="text-primary-700 bg-white hover:bg-gray-100"
              >
                Get Started for Free
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
