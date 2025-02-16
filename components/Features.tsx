import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                AI-Powered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Generate professional email templates using cutting-edge AI
                technology.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Customizable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easily tailor your templates to match your brand identity and
                style.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Time-Saving
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create beautiful email templates in seconds, boosting your
                productivity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
