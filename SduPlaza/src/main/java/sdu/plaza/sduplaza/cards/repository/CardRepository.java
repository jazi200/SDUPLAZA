package sdu.plaza.sduplaza.cards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sdu.plaza.sduplaza.cards.entity.CardEntity;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {

    @Query(nativeQuery = true,value = "SELECT * FROM cards " +
            "WHERE cards.user_id = :id")
    List<CardEntity> getCardByUserId(@Param(value = "id") Long id);

}
