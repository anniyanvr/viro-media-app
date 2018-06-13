pipeline {
  agent any
  stages {
    stage('initial_setup') {
      steps {
        sh '''cd android
        fastlane save_git_log'''
      }
    }
    stage('gvr_release_apk') {
      steps {
        sh '''cd android
fastlane gvr_release'''
      }
    }
  }
  environment {
    LC_ALL = 'en_US.UTF-8'
    LANG = 'en_US.UTF-8'
    TGZ_LOC = '/var/tmp/build_intermediates/s3_artifacts/react-viro-*.tgz'
  }
}
