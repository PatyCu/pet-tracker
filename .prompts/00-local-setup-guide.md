# Step by Step Guide - Running Pet Tracker Locally

## Prerequisites Check

Open your terminal and verify what you already have:

```bash
node --version    # Need v18+ (you have v24.13.0 ✅)
pnpm --version    # Need v9+ (you have v10.29.3 ✅)
```

---

## Option A: Run on Your iPhone (Easiest — No Simulator Needed)

### Step 1: Install Expo Go on your phone

- Open the App Store on your iPhone
- Search for **"Expo Go"** and install it
- Create a free Expo account if prompted (or skip)

### Step 2: Start the dev server

```bash
cd ~/Code/pet-tracker
pnpm start
```

You'll see a QR code in your terminal.

### Step 3: Scan the QR code

- Open your **iPhone camera** (not Expo Go)
- Point it at the QR code in the terminal
- Tap the notification banner that appears — it will open in Expo Go
- Wait for the JavaScript bundle to load (first time takes ~15-30 seconds)

> **Troubleshooting:** Your phone and laptop must be on the **same Wi-Fi network**. If it doesn't connect, press `s` in the terminal to switch to Tunnel mode (slower but works across networks — it will install `@expo/ngrok` automatically).

---

## Option B: Run on iOS Simulator (macOS)

### Step 1: Install Xcode

- Open the **App Store** on your Mac
- Search for **"Xcode"** and install it (it's ~12 GB, may take a while)
- After installing, open Xcode once and accept the license agreement
- It will prompt to install additional components — let it finish

### Step 2: Install Xcode Command Line Tools

```bash
xcode-select --install
```

If you get "already installed", you're good.

### Step 3: Verify a simulator is available

```bash
xcrun simctl list devices available | head -20
```

You should see iPhone models listed. If not, open **Xcode → Settings → Platforms** and download an iOS simulator runtime.

### Step 4: Run the app

```bash
cd ~/Code/pet-tracker
pnpm run ios
```

This will:

1. Start the Metro bundler
2. Launch the iOS Simulator automatically
3. Install Expo Go in the simulator
4. Open your app

First run takes 1-2 minutes. Subsequent runs are much faster.

---

## Option C: Run on Android Emulator

### Step 1: Install Android Studio

- Download from https://developer.android.com/studio
- Run the installer and follow the setup wizard
- Select **"Standard"** installation type
- Let it download the Android SDK and emulator components

### Step 2: Create a Virtual Device

- Open Android Studio
- Go to **More Actions → Virtual Device Manager** (or Tools → Device Manager)
- Click **"Create Device"**
- Pick a phone (e.g., **Pixel 7**) → Next
- Download a system image (e.g., **API 34, Tiramisu**) → Next → Finish

### Step 3: Set up environment variables

Add to your `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then reload:

```bash
source ~/.zshrc
```

### Step 4: Run the app

```bash
cd ~/Code/pet-tracker
pnpm run android
```

This will launch the emulator and install the app.

---

## Option D: Run in Web Browser (Quickest to Test)

```bash
cd ~/Code/pet-tracker
pnpm run web
```

This opens the app in your default browser. Good for quick UI checks, but some React Native features may not work identically to mobile.

---

## Day-to-Day Development Tips

| Action               | How                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Reload the app**   | Shake your phone (or Cmd+D in simulator) → "Reload"                                      |
| **Open dev menu**    | Shake phone / Cmd+D (iOS sim) / Cmd+M (Android emu)                                      |
| **Clear cache**      | `pnpm start --clear`                                                                     |
| **Stop the server**  | Press `Ctrl+C` in terminal                                                               |
| **Switch platforms** | Press `i` (iOS), `a` (Android), or `w` (web) in the terminal while the server is running |

---

## Recommended: Start with Option A

Using Expo Go on your phone is the fastest path — no simulator setup, no Xcode download. You can always set up the simulator later when you need it.
