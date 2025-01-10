import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:taskapp_frontend/core/utils.dart';
import 'package:taskapp_frontend/features/auth/repository/auth_remote_repository.dart';
import 'package:taskapp_frontend/models/user_model.dart';

part 'auth_state.dart';

class AuthCubit extends Cubit<AuthState> {
  AuthCubit() : super(AuthInitial());

  final authRemoteRepository = AuthRemoteRepository();
  final spService = SpService();

  void getUserData() async {
    try {
      emit(AuthLoading());
      final userModel = await authRemoteRepository.getUserData();

      if (userModel != null) {
        emit(AuthLoggedIn(userModel));
      }
    } catch (e) {
      print(e);
      emit(AuthInitial());
    }
  }

  void signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      emit(AuthLoading());
      final userModel = await authRemoteRepository.signUp(
        name: name,
        email: email,
        password: password,
      );
      debugPrint(userModel.toJson().toString());

      emit(AuthSignUp());
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  void login({
    required String email,
    required String password,
  }) async {
    try {
      emit(AuthLoading());
      final userModel = await authRemoteRepository.login(
        email: email,
        password: password,
      );

      if (userModel.token!.isNotEmpty) {
        spService.setToken(userModel.token!);
      }

      debugPrint(userModel.toJson().toString());
      emit(AuthLoggedIn(userModel));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }
}
