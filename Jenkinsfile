pipeline {
  agent any
  stages {
    stage('node_modules (clean install)') {
      steps {
        sh '''cd android
fastlane clean_npm_install'''
        echo 'Testing where this "prints a message" \\n is this markdown?'
      }
    }
    stage('apply_patch') {
      steps {
        sh '''cd android
fastlane apply_patch'''
      }
    }
    stage('gvr_release_apk') {
      steps {
        sh '''cd android
fastlane gvr_release'''
      }
    }
    stage('cp_s3_artifacts') {
      steps {
        sh '''cd android
fastlane upload_s3'''
      }
    }
  }
  environment {
    LC_ALL = 'en_US.UTF-8'
    LANG = 'en_US.UTF-8'
  }
}