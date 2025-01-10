import 'package:flutter_dotenv/flutter_dotenv.dart';

final String _backendUrl = dotenv.env['BACKEND_URL'] ?? '';

class Urls {
  static String signUpUrl = '$_backendUrl/auth/signup';
  static String loginUrl = '$_backendUrl/auth/login';
  static String tokenIsValidUrl = '$_backendUrl/auth/tokenIsValid';
  static String getUserUrl = '$_backendUrl/auth';
}
