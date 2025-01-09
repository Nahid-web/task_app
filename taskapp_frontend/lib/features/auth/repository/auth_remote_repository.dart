import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:taskapp_frontend/core/constants/urls.dart';
import 'package:taskapp_frontend/models/user_model.dart';

class AuthRemoteRepository {
  Future<UserModel> signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      print(Urls.signUpUrl);
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
      print(e.toString());
      throw e.toString();
    }
  }
}
