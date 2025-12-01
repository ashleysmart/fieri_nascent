FROM ubuntu:24.04

# To avoid "tzdata" asking for geographic area
ARG DEBIAN_FRONTEND=noninteractive

# https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2024.3.2.15/android-studio-2024.3.2.15-linux.tar.gz
# https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip

# Dependencies and needed tools
RUN apt update -qq \
    && apt install -qq -y \
        sudo git unzip wget curl vim clang-format gdb cmake swig unzip \
        sysvbanner  \
        openjdk-17-jdk-headless npm \
        libglu1 libpulse-dev libc6  libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
        libxcomposite1 libxcursor1 libxi6  libxtst6 libnss3

# Download commandlinetools, install packages and accept all licenses
RUN mkdir -p /opt/android/cmdline-tools \
    && wget -q 'https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip' -P /tmp \
    && unzip -q -d /opt/android/cmdline-tools /tmp/commandlinetools-linux-13114758_latest.zip \
    && mv /opt/android/cmdline-tools/cmdline-tools /opt/android/cmdline-tools/latest \
    && rm /tmp/commandlinetools-linux-13114758_latest.zip

ARG ANDROID_API_LEVEL=29
ARG ANDROID_BUILD_TOOLS_LEVEL=29.0.3
ARG ANDROID_NDK_VERSION=21.1.6352462
RUN yes Y | /opt/android/cmdline-tools/latest/bin/sdkmanager  \
        --install "build-tools;${ANDROID_BUILD_TOOLS_LEVEL}" \
            "platforms;android-${ANDROID_API_LEVEL}" \
            "platform-tools" \
            "ndk;${ANDROID_NDK_VERSION}" \
            "emulator" \
    && yes Y | /opt/android/cmdline-tools/latest/bin/sdkmanager --licenses

RUN npm install -g eas-cli \
    && npm install -g expo-dev-client \
    && npm install -g bun \
    && npm install -g bob \
    && npm install -g yarn \
    && npm install -g typescript

# install bob and bun for react-native-vision-camera build
RUN curl -L https://bob.build/install.sh | BIN_DIR=/usr/bin sh

RUN git config --global --add safe.directory '*'

# Download gradle, install gradle and gradlew
ARG GRADLE_VERSION=8.9
RUN wget -q https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp \
    && unzip -q -d /opt/gradle /tmp/gradle-${GRADLE_VERSION}-bin.zip \
    && mkdir /opt/gradlew \
    && rm /tmp/gradle-${GRADLE_VERSION}-bin.zip

#    && /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle wrapper --gradle-version ${GRADLE_VERSION} --distribution-type all -p /opt/gradlew  \
#    && /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle wrapper -p /opt/gradlew \

# Environment variables to be used for build
ENV GRADLE_HOME=/opt/gradle/gradle-$GRADLE_VERSION
ENV ANDROID_HOME=/opt/android
ENV ANDROID_NDK_HOME=${ANDROID_HOME}/ndk/${ANDROID_NDK_VERSION}
ENV PATH "$PATH:$GRADLE_HOME/bin:/opt/gradlew"
ENV PATH "$PATH:$ANDROID_HOME/emulator"
ENV PATH "$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
ENV PATH "$PATH:$ANDROID_HOME/platform-tools"
ENV PATH "$PATH:${ANDROID_NDK_HOME}"
ENV LD_LIBRARY_PATH "$ANDROID_HOME/emulator/lib64:$ANDROID_HOME/emulator/lib64/qt/lib"

EXPOSE 5037
EXPOSE 5353

# Clean up
WORKDIR /workdir/
CMD /bin/bash
