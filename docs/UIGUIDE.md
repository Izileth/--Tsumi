import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Svg, { Path, Circle as SvgCircle } from "react-native-svg";

const { width } = Dimensions.get("window");

// Pequeno círculo branco com ícone de marca dentro, usado na composição
// decorativa de logos (Google, LinkedIn, Figma, Telegram, Chrome, Microsoft).
function BrandBubble({ children, size = 56, style }) {
  return (
    <View
      style={[{ width: size, height: size }, style]}
      className="absolute rounded-full bg-white items-center justify-center shadow-lg"
    >
      {children}
    </View>
  );
}

export default function OnboardingScreen({ navigation }) {
  return (
    <View className="flex-1 bg-bg px-6 pt-16">
      {/* Cabeçalho / título */}
      <View className="mt-2">
        <Text className="text-white text-4xl font-extrabold leading-[44px]">
          Create A{"\n"}
          Better{" "}
          <Text className="bg-white text-bg px-2 rounded-lg overflow-hidden">
            Future
          </Text>
          {"\n"}
          For Yourself
        </Text>
      </View>

      {/* Área decorativa: pontilhado + bolhas de logos */}
      <View className="flex-1 items-center justify-center">
        <View style={{ width: width * 0.8, height: width * 0.8 }} className="relative">
          {/* Linha pontilhada em curva, decorativa */}
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 300 300"
            style={{ position: "absolute" }}
          >
            <Path
              d="M60 40 C 180 10, 260 90, 200 150 C 140 210, 40 190, 60 260"
              stroke="#3A3A3D"
              strokeWidth="2"
              strokeDasharray="6 8"
              fill="none"
            />
          </Svg>

          {/* Seta curva no topo direito */}
          <View className="absolute -top-2 right-4">
            <Feather name="corner-right-down" size={30} color="#5A5A5D" />
          </View>

          {/* Bolhas de logos posicionadas para lembrar o layout original */}
          <BrandBubble size={64} style={{ top: 10, left: 60 }}>
            <FontAwesome5 name="google" size={24} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={56} style={{ top: 55, left: 150 }}>
            <FontAwesome5 name="dribbble" size={22} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={56} style={{ top: 120, left: 20 }}>
            <FontAwesome5 name="linkedin-in" size={22} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={64} style={{ top: 130, left: 110 }}>
            <FontAwesome5 name="figma" size={24} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={56} style={{ top: 165, left: 200 }}>
            <FontAwesome5 name="telegram-plane" size={22} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={56} style={{ top: 220, left: 60 }}>
            <FontAwesome5 name="chrome" size={22} color="#0B0B0C" />
          </BrandBubble>

          <BrandBubble size={64} style={{ top: 220, left: 150 }}>
            <FontAwesome5 name="microsoft" size={24} color="#0B0B0C" />
          </BrandBubble>
        </View>
      </View>

      {/* Botão principal */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation?.navigate?.("Home")}
        className="bg-white rounded-full h-16 mb-10 flex-row items-center justify-center"
      >
        <Text className="text-bg font-bold text-base mr-2">Start Now</Text>
        <View className="w-8 h-8 rounded-full bg-bg items-center justify-center ml-1">
          <Feather name="arrow-right" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

function Tag({ label }) {
  return (
    <View className="bg-card2 rounded-full px-3 py-1 mr-2">
      <Text className="text-muted text-xs">{label}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState("Recomendation");

  return (
    <View className="flex-1 bg-bg pt-16">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        {/* Cabeçalho com saudação e sino de notificação */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-muted text-sm">Good Morning,</Text>
            <Text className="text-white text-lg font-bold">Stave Morgan</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full bg-card items-center justify-center">
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text className="text-white text-3xl font-extrabold leading-9 mb-6">
          Let`s Find Your{"\n"}Dream Job!
        </Text>

        {/* Barra de busca */}
        <View className="flex-row items-center bg-card rounded-full px-5 py-4 mb-5">
          <TextInput
            placeholder="Type your prefer job..."
            placeholderTextColor="#8A8A8E"
            className="flex-1 text-white text-sm"
          />
          <TouchableOpacity className="w-9 h-9 rounded-full bg-white items-center justify-center">
            <Feather name="search" size={16} color="#0B0B0C" />
          </TouchableOpacity>
        </View>

        {/* Abas Recomendation / Analytic */}
        <View className="flex-row mb-6">
          {["Recomendation", "Analytic"].map((label) => {
            const isActive = tab === label;
            return (
              <TouchableOpacity
                key={label}
                onPress={() => setTab(label)}
                className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
                  isActive ? "bg-white" : "bg-card"
                }`}
              >
                <Feather
                  name={label === "Recomendation" ? "thumbs-up" : "bar-chart-2"}
                  size={14}
                  color={isActive ? "#0B0B0C" : "#8A8A8E"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  className={`text-xs font-medium ${
                    isActive ? "text-bg" : "text-muted"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Card de vaga recomendada */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation?.navigate?.("Details")}
          className="bg-card rounded-3xl p-5"
        >
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center mr-3">
                <FontAwesome5 name="apple" size={20} color="#0B0B0C" />
              </View>
              <View>
                <Text className="text-white font-bold text-base">
                  Analytic Data
                </Text>
                <Text className="text-muted text-xs mt-0.5">
                  Apple Officer
                </Text>
              </View>
            </View>
            <TouchableOpacity className="w-9 h-9 rounded-full bg-card2 items-center justify-center">
              <Feather name="bookmark" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-4">
            <Tag label="Full time" />
            <Tag label="Offline" />
            <Tag label="1 Years EXP" />
          </View>

          <Text className="text-muted text-xs leading-5 mb-5">
            Discover how you can make an impact: See our areas of work,
            worldwide locations, and opportunities for students.
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold text-base">
              $250 / Month
            </Text>
            <View className="flex-row items-center bg-card2 rounded-full px-3 py-1.5 mr-2">
              <Feather name="clock" size={12} color="#8A8A8E" />
              <Text className="text-muted text-xs ml-1">1 Week Ago</Text>
            </View>
            <TouchableOpacity className="w-9 h-9 rounded-full bg-white items-center justify-center">
              <Feather name="arrow-right" size={16} color="#0B0B0C" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav active="home" onChange={() => {}} />
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

function StatItem({ icon, label, value }) {
  return (
    <View className="items-center flex-1">
      <View className="w-11 h-11 rounded-full bg-card items-center justify-center mb-2">
        <Feather name={icon} size={18} color="#fff" />
      </View>
      <Text className="text-muted text-[11px] mb-0.5">{label}</Text>
      <Text className="text-white font-bold text-sm">{value}</Text>
    </View>
  );
}

export default function JobDetailsScreen({ navigation }) {
  return (
    <View className="flex-1 bg-bg pt-16 px-6">
      {/* Cabeçalho */}
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity
          onPress={() => navigation?.goBack?.()}
          className="w-11 h-11 rounded-full bg-card items-center justify-center"
        >
          <Feather name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Details</Text>
        <TouchableOpacity className="w-11 h-11 rounded-full bg-card items-center justify-center">
          <Feather name="more-vertical" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ícone + título da vaga */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center mb-4">
            <FontAwesome5 name="apple" size={26} color="#0B0B0C" />
          </View>
          <Text className="text-white text-xl font-extrabold">
            Analytic Data
          </Text>
          <Text className="text-muted text-sm mt-1">Apple Officer</Text>
        </View>

        {/* Estatísticas: salário, tipo, localização */}
        <View className="flex-row bg-card2/40 rounded-2xl py-5 mb-8">
          <StatItem icon="dollar-sign" label="Salary" value="$250/M" />
          <View className="w-[1px] bg-border my-1" />
          <StatItem icon="clock" label="Job Time" value="Full Time" />
          <View className="w-[1px] bg-border my-1" />
          <StatItem icon="map-pin" label="Location" value="New York" />
        </View>

        {/* Descrição */}
        <Text className="text-white font-bold text-base mb-3">
          Description
        </Text>
        <Text className="text-muted text-sm leading-6 mb-10">
          We're leading experts: hardware experts lead hardware, software
          experts lead software, and design experts lead design. This differs
          from most other large companies, where general managers oversee
          managers.
        </Text>
      </ScrollView>

      {/* Botão de ação */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-white rounded-full h-16 mb-10 flex-row items-center justify-center"
      >
        <Text className="text-bg font-bold text-base mr-2">Apply Now</Text>
        <View className="w-8 h-8 rounded-full bg-bg items-center justify-center ml-1">
          <Feather name="arrow-right" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}


