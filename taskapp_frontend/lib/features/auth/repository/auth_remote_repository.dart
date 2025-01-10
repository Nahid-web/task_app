import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:taskapp_frontend/core/constants/urls.dart';
import 'package:taskapp_frontend/core/utils.dart';
import 'package:taskapp_frontend/models/user_model.dart';

class AuthRemoteRepository {
  final spService = SpService();
  Future<UserModel> signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final res = await http.post(
        Uri.parse(Urls.signUpUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
        }),
      );

      if (res.statusCode != 201) {
        throw jsonDecode(res.body)['error'];
      }

      return UserModel.fromJson(jsonDecode(res.body));
    } catch (e) {
      throw e.toString();
    }
  }

  Future<UserModel> login({
    required String email,
    required String password,
  }) async {
    try {
      final res = await http.post(
        Uri.parse(
          Urls.loginUrl,
        ),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (res.statusCode != 200) {
        throw jsonDecode(res.body)['error'];
      }
      return UserModel.fromJson(
        jsonDecode(res.body),
      );
    } catch (e) {
      throw e.toString();
    }
  }

  getUserData() async {
    try {
      final token = await spService.getToken();

      if (token == null) {
        return null;
      }

      final res = await http.post(
        Uri.parse(Urls.tokenIsValidUrl),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      );

      if (res.statusCode != 200 || jsonDecode(res.body) == false) {
        return null;
      }

      final userResponse = await http.get(Uri.parse(Urls.getUserUrl), headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      });

      if (userResponse.statusCode != 200) {
        throw jsonDecode(userResponse.body)['error'];
      }
      return UserModel.fromJson(jsonDecode(userResponse.body));
    } catch (e) {
      return null;
    }
  }
}
