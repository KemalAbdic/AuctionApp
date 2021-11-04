package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PersonControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    @Order(1)
    void userRegistrationSuccessful() throws Exception {
        String json = "{" +
                "\"firstName\":\"Zoro\"," +
                "\"lastName\":\"Roronoa\"," +
                "\"email\":\"pirate.hunter@gmail.com\"," +
                "\"password\":\"STRONGESTpassword\"" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Order(2)
    void userRegistrationEmailAlreadyExists() throws Exception {
        String json = "{" +
                "\"firstName\":\"Zoro\"," +
                "\"lastName\":\"Roronoa\"," +
                "\"email\":\"pirate.hunter@gmail.com\"," +
                "\"password\":\"STRONGESTpassword\"" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .put("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Order(3)
    void userLoginSuccess() throws Exception {
        String json = "{" +
                "\"email\": \"pirate.hunter@gmail.com\", " +
                "\"password\": \"STRONGESTpassword\"" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());
    }
}