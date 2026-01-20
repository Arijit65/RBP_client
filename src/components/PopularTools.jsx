import { motion } from 'framer-motion';
import { Calculator, CreditCard, BadgeDollarSign, Maximize2, ChevronRight, Lightbulb } from 'lucide-react';

const PopularTools = () => {
  const tools = [
    {
      title: 'Budget Calculator',
      description: 'Check your affordability range for buying home',
      icon: Calculator,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      link: '#'
    },
    {
      title: 'EMI Calculator',
      description: 'Calculate your home loan EMI',
      icon: CreditCard,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      link: '#'
    },
    {
      title: 'Loan Eligibility',
      description: 'See what you can borrow for your home',
      icon: BadgeDollarSign,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      link: '#'
    },
    {
      title: 'Area Converter',
      description: 'Convert one area into any other easily',
      icon: Maximize2,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-amber-500 p-3 rounded-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Use popular tools</h2>
              <p className="text-gray-700 font-medium">Go from browsing to buying</p>
            </div>
          </div>
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="hidden lg:flex items-center text-amber-500 font-semibold hover:underline"
          >
            View all Insights
            <ChevronRight className="w-5 h-5 ml-1" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.a
                key={index}
                href={tool.link}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`${tool.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${tool.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-500 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-700 text-sm font-medium">
                  {tool.description}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center lg:hidden"
        >
          <a
            href="#"
            className="inline-flex items-center text-amber-500 font-semibold hover:underline"
          >
            View all Insights
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTools;
