import React from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);

  const header = screen.getByTestId("header");

  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent("İletişim Formu");
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);

  const adInput = screen.getByTestId("ad-input");
  await userEvent.type(adInput, "xxxx");

  const hataMesaji = screen.getByTestId("error");
  expect(hataMesaji).toBeInTheDocument();

  const errorIdliElementler = screen.queryAllByTestId("error");
  expect(errorIdliElementler).toHaveLength(1);
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);

  const gonderButonu = screen.getByTestId("submit-button");
  await userEvent.click(gonderButonu);

  const hatalar = screen.queryAllByTestId("error");
  expect(hatalar).toHaveLength(3);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);

  const adInput = screen.getByTestId("ad-input");
  await userEvent.type(adInput, "xxxxx");

  const soyadInput = screen.getByTestId("soyad-input");
  await userEvent.type(soyadInput, "x");

  const gonderButonu = screen.getByTestId("submit-button");
  await userEvent.click(gonderButonu);

  const errorIdliElementler = screen.queryAllByTestId("error");
  expect(errorIdliElementler).toHaveLength(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const emailInput = screen.getByTestId("email-input");
  await userEvent.type(emailInput, "x");

  const hataMesaji = screen.getByTestId("error");
  expect(hataMesaji).toHaveTextContent(
    "email geçerli bir email adresi olmalıdır."
  );
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const adInput = screen.getByTestId("ad-input");
  await userEvent.type(adInput, "xxxxx");

  const emailInput = screen.getByTestId("email-input");
  await userEvent.type(emailInput, "x@x.x");

  const gonderButonu = screen.getByTestId("submit-button");
  await userEvent.click(gonderButonu);

  const hataMesaji = screen.getByTestId("error");
  expect(hataMesaji).toHaveTextContent("soyad gereklidir.");
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
