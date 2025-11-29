import { BookOpen, Target, Trophy, Lightbulb, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

/**
 * Help Page - Comprehensive guide for using Polygon Practice
 */
export function HelpPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="academic-card-raised rounded-lg p-8 mb-6 border-t-4 border-t-slate-600">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help & Guide</h1>
              <p className="text-gray-600">Learn how to use Polygon Practice effectively</p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Getting Started
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Polygon Practice is an interactive learning platform designed to help you master polygon geometry. 
            Choose between two practice modes: <strong>Angles</strong> or <strong>Diagonals</strong>, 
            and start solving problems immediately.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Start with the Angles practice if you're new to polygon geometry. 
              It covers foundational concepts that will help you understand diagonals better.
            </p>
          </div>
        </div>

        {/* Angles Practice */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Angles Practice Mode
          </h2>
          <p className="text-gray-700 mb-4">
            Practice calculating interior and exterior angles of polygons. This mode includes:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Sum of Interior Angles:</strong>
                <span className="text-gray-700"> Calculate the total of all interior angles in a polygon</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Sum of Exterior Angles:</strong>
                <span className="text-gray-700"> Learn about exterior angles (always 360°!)</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Finding Number of Sides:</strong>
                <span className="text-gray-700"> Work backwards from angle measurements to find polygon sides</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Algebraic Problems:</strong>
                <span className="text-gray-700"> Solve for unknown variables using angle relationships</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Diagonals Practice */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Diagonals Practice Mode
          </h2>
          <p className="text-gray-700 mb-4">
            Master polygon diagonals and their properties. This mode covers:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Total Diagonals:</strong>
                <span className="text-gray-700"> Calculate all possible diagonals in a polygon using n(n-3)/2</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Diagonals from One Vertex:</strong>
                <span className="text-gray-700"> Find how many diagonals connect from a single vertex (n-3)</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Finding Sides from Diagonals:</strong>
                <span className="text-gray-700"> Reverse calculations to determine the number of sides</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Multi-step Problems:</strong>
                <span className="text-gray-700"> Combine concepts to solve complex diagonal challenges</span>
              </div>
            </li>
          </ul>
        </div>

        {/* How to Use */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-600" />
            How to Use the Practice Modes
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">1. Select a Problem Type</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Use the buttons at the top to choose which type of problem you want to practice. 
                Each button shows how many problems of that type you've attempted.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">2. Enter Your Answer</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Type your numerical answer in the input field. For decimal answers, round to 2 decimal places. 
                Press Enter or click "Submit Answer" to check your work.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">3. View Results</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                After submitting, you'll see if your answer is correct or incorrect:
              </p>
              <div className="space-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 border border-green-600 text-green-600 px-3 py-1 rounded text-sm font-semibold">
                    Correct!
                  </div>
                  <span className="text-sm text-gray-600">Your answer matches the correct solution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 border border-red-600 text-red-600 px-3 py-1 rounded text-sm font-semibold">
                    Incorrect
                  </div>
                  <span className="text-sm text-gray-600">Try again or view the solution</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">4. View Step-by-Step Solutions</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Click "Show Solution" to see a detailed explanation of how to solve the problem. 
                This is a great learning tool when you're stuck or want to verify your approach.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">5. Get a New Problem</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Click "New Problem" at any time to generate a fresh question. 
                You can switch problem types anytime using the buttons at the top.
              </p>
            </div>
          </div>
        </div>

        {/* Scoring System */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-600" />
            Understanding Your Score
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Your progress is tracked in real-time with a scoreboard that shows:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-900">Correct Answers</h3>
              </div>
              <p className="text-sm text-gray-700">
                Tracks every problem you solve correctly. Your accuracy rate is calculated automatically.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-900">Incorrect Answers</h3>
              </div>
              <p className="text-sm text-gray-700">
                Shows attempts that need more practice. Use these as learning opportunities!
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Success */}
        <div className="academic-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            Tips for Success
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                1
              </div>
              <p className="text-gray-700">
                <strong>Practice regularly:</strong> Consistent practice helps reinforce concepts and improve speed
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                2
              </div>
              <p className="text-gray-700">
                <strong>Review solutions:</strong> Always read the step-by-step explanations to understand the method
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                3
              </div>
              <p className="text-gray-700">
                <strong>Try different types:</strong> Work through all problem types to build comprehensive understanding
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                4
              </div>
              <p className="text-gray-700">
                <strong>Track your progress:</strong> Watch your accuracy improve over time as you master each concept
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                5
              </div>
              <p className="text-gray-700">
                <strong>Challenge yourself:</strong> Try solving problems without viewing solutions first
              </p>
            </li>
          </ul>
        </div>

        {/* Quick Reference */}
        <div className="academic-card rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference Formulas</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-600 mb-3">Angle Formulas</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Sum of Interior Angles:</p>
                  <p className="text-gray-700 font-mono mt-1">(n - 2) × 180°</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Each Interior Angle (regular):</p>
                  <p className="text-gray-700 font-mono mt-1">I = (n - 2) × 180° ÷ n</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Sum of Exterior Angles:</p>
                  <p className="text-gray-700 font-mono mt-1">360°</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Each Exterior Angle (regular):</p>
                  <p className="text-gray-700 font-mono mt-1">E = 360° ÷ n</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Finding Sides from Exterior Angle:</p>
                  <p className="text-gray-700 font-mono mt-1">n = 360° ÷ E</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Interior + Exterior Angle:</p>
                  <p className="text-gray-700 font-mono mt-1">I + E = 180°</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 mb-3">Diagonal Formulas</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Total Diagonals:</p>
                  <p className="text-gray-700 font-mono mt-1">n(n - 3) ÷ 2</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-900">Diagonals from One Vertex:</p>
                  <p className="text-gray-700 font-mono mt-1">n - 3</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-gray-900 italic">where <span className="font-mono">n</span> = number of sides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

