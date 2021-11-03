package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.Person;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

@Component
public class JwtUtils implements Serializable {

    private static String jwtSecret;
    private static long jwtExpirationMs;

    @Value("${app.jwtSecret}")
    public void setJwtSecret(String jwtSecret) {
        JwtUtils.jwtSecret = jwtSecret;
    }
    @Value("${app.jwtExpirationMs}")
    public void setJwtExpirationMs(long jwtExpirationMs) {
        JwtUtils.jwtExpirationMs = jwtExpirationMs;
    }

    public static String generateJwtToken(Person person) {
        long timestamp = System.currentTimeMillis();
        return Jwts.builder()
                .claim("id", person.getId())
                .setSubject(person.getEmail())
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
