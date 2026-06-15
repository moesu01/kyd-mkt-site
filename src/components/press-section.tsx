import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react"
import { pressCoverage } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function PressSection() {
  return (
    <Box
      as="section"
      id="press"
      borderTop="1px solid"
      borderColor="border"
      bg="surface"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Box mb="12">
          <SectionHeading
            label="Press"
            headline={
              <>
                As seen in the{" "}
                <Text as="span" color="accent">
                  press.
                </Text>
              </>
            }
          />
        </Box>

        <Grid
          templateColumns={{ base: "1fr", lg901: "repeat(2, 1fr)" }}
          gap="6"
        >
          {pressCoverage.map((item) => (
            <Flex
              as="article"
              key={item.outlet}
              direction="column"
              gap="4"
              borderRadius="md"
              border="1px solid"
              borderColor={item.placeholder ? "borderStrong" : "border"}
              borderStyle={item.placeholder ? "dashed" : "solid"}
              p="8"
              transitionProperty="colors"
              transitionDuration="150ms"
              _hover={
                item.placeholder
                  ? undefined
                  : { borderColor: "borderStrong" }
              }
            >
              <Flex align="baseline" justify="space-between" gap="4">
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={item.placeholder ? "fgFaint" : "accent"}
                >
                  {item.outlet}
                </Text>
                <Text
                  as="time"
                  flexShrink={0}
                  fontFamily="mono"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={item.placeholder ? "fgFaint" : "fgGhost"}
                  {...(!item.placeholder ? { dateTime: item.date } : {})}
                >
                  {item.date}
                </Text>
              </Flex>

              <Heading
                as="h3"
                fontSize="lg"
                fontWeight="semibold"
                lineHeight="snug"
                fontStyle={item.placeholder ? "italic" : undefined}
                color={item.placeholder ? "fgFaint" : "fg"}
              >
                {item.headline}
              </Heading>

              <Link
                href={item.href}
                mt="auto"
                display="inline-flex"
                minH="10"
                alignItems="center"
                fontSize="sm"
                fontWeight="medium"
                transitionProperty="colors"
                transitionDuration="150ms"
                pointerEvents={item.placeholder ? "none" : undefined}
                color={item.placeholder ? "fgFaint" : "fgMuted"}
                _hover={
                  item.placeholder ? undefined : { color: "fg" }
                }
                aria-label={
                  item.placeholder
                    ? `${item.outlet} article coming soon`
                    : `Read ${item.outlet} article`
                }
                tabIndex={item.placeholder ? -1 : undefined}
              >
                {item.placeholder ? "Article coming soon" : "Read article →"}
              </Link>
            </Flex>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
