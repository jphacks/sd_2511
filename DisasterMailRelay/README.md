# Disaster Mail Relay

This project is a React Native application designed to facilitate communication between devices using Bluetooth Low Energy (BLE). It implements secure messaging through AES and RSA encryption methods.

## Project Structure

```
DisasterMailRelay
├── src
│   ├── App.js                  # Entry point of the application, defining the overall structure.
│   ├── Sender.js               # Contains functionality to send messages to BLE devices.
│   ├── Recipient.js            # Contains functionality to receive messages from BLE devices.
│   ├── cryptoUtils.js          # Utility functions for encryption and decryption.
│   ├── components
│   │   └── ExampleComponent.js  # Example component used within the application.
│   └── screens
│       └── HomeScreen.js       # Defines the home screen of the application.
├── index.js                    # Entry point to start the application and register the App component.
├── package.json                # Defines project dependencies and scripts.
├── babel.config.js             # Babel configuration file specifying presets for Metro bundler.
├── metro.config.js             # Configuration file for Metro bundler.
├── .gitignore                  # Specifies files and directories to ignore in Git.
└── README.md                   # Documentation for the project.
```

## Features

- **Secure Messaging**: Utilizes AES for message encryption and RSA for key exchange.
- **BLE Communication**: Enables communication between devices using Bluetooth Low Energy.
- **Modular Structure**: Organized into components and screens for better maintainability.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd DisasterMailRelay
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To run the application, use the following command:
```
npx react-native run-android
```
or
```
npx react-native run-ios
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.