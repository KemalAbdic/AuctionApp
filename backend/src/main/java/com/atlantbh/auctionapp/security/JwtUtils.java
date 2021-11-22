package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.function.Function;

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

    public static Long getRequestPersonId() {
        if (!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof PersonDetails))
            throw new IllegalArgumentException("Unauthorized");
        return ((PersonDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public Boolean validateToken(String token, UserDetails personDetails) {
        final String email = getEmailFromToken(token);
        return (email.equals(personDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
