def buildApp() {
   echo "Building the Application.."
}

def testApp() {
  echo "Testing the Application.."
}

def deployApp() {
  echo "Deploying the Application.."
  echo "deploying with ${SERVER_CREDENTIAL}"
  echo "deploying version ${params.VERSION}"
}

return this
